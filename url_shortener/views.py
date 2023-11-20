from django.contrib.auth.hashers import check_password
from django.db import IntegrityError
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.paginator import Paginator
from django.utils import timezone
from django.db.models import Count
from django.contrib import messages
from django.shortcuts import redirect
from django.views.decorators.cache import cache_control

from .serializers import *
from .models import *

from datetime import timedelta, datetime
import json
import pyperclip
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from user_agents import parse
from decouple import config

API_KEY = config("API_KEY")

# Create your views here.
class ListURLView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = URLSerializers

    def get_queryset(self):
        user = self.request.user
        return URL.objects.filter(owner=user)

class CreateURLView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = URLSerializers

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            original_url = serializer.validated_data.get("original_url")
            owner = request.user
            shortened_code = serializer.validated_data.get("shortened_code")
            if shortened_code == "":
                shortened_code = generate_unique_code()
            url_instance = URL.objects.create(
                original_url=original_url, shortened_code=shortened_code, owner=owner
            )

            shortened_url = build_shortened_url(request, url_instance)

            return Response(
                {
                    "shortened_url": shortened_url,
                    "original_url": url_instance.original_url,
                    "owner": url_instance.owner.username,
                }
            )
        else:
            return Response(serializer.errors, status=400)

class UpdateURLView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = URL.objects.all()
    serializer_class = URLSerializers
    lookup_field = "shortened_code"

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        # You can customize the response data as needed
        response_data = {
            'message': 'Resource updated successfully',
            'data': serializer.data
        }

        return Response(response_data)
    
class DeleteURLView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = URL.objects.all()
    serializer_class = URLSerializers
    lookup_field = "shortened_code"

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)

        return Response(
            {
                "message": "URL deleted successfully", 
            },
        )


def record_ip(request, url_obj):
    client_ip = request.META.get("HTTP_X_FORWARDED_FOR", None) or request.META.get(
        "REMOTE_ADDR", None
    )
    country = get_user_location(client_ip)
    device_type = get_user_device(request)

    # Save the IP record to the database
    ip_record = IPRecord.objects.create(ip_address=client_ip, device_type=device_type, shortened_url=url_obj, location=country)


def get_user_device(request):
    user_agent_string = request.META.get("HTTP_USER_AGENT", None)
    user_agent = parse(user_agent_string)

    if user_agent.is_pc:
        device_type = "Destop"
    elif user_agent.is_mobile:
        device_type = "Mobile"
    elif user_agent.is_tablet:
        device_type = "Tablet"
    else:
        device_type = "Unknown"

    return device_type


def get_user_location(ip_address):
    try:
        # Make a request to the ipstack API
        response = requests.get(f"http://api.ipstack.com/{ip_address}?access_key={API_KEY}")

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the JSON response
            data = response.json()
            country = data.get("country_name")
            if country is None:
                country = "Unknown"
            return country
        else:
            return "Unknown"
    except Exception as e:
        return "Unknown"


def redirect_url(request, code):
    url_obj = URL.objects.filter(shortened_code=code).all()
    if url_obj.count() == 0:
        return render(request, "url_shortener/not_found.html")
    else:
        # Record the ip address
        record_ip(request, url_obj.first())

        original_url = url_obj.first().original_url

        return HttpResponseRedirect(original_url)


def build_shortened_url(request, url_object):
    schema = request.scheme + "://"
    host = request.get_host()
    shortened_path = f"/{url_object.shortened_code}"

    return schema + host + shortened_path


def create_url_obj(owner, long_url, alias, title):
    if title == "" or title is None:
        title = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    
    if alias == "":
        alias = generate_unique_code()

    # Get the favicon of the long url
    try:
        response = requests.get(long_url)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find the favicon link in the HTML
        favicon_link = soup.find("link", rel="icon") or soup.find("link", rel="shortcut icon")

        if favicon_link:
            # Construct the absolute URL of the favicon
            favicon_url = urljoin(long_url, favicon_link['href'])
        else:
            favicon_url = None

    except Exception as e:
        favicon_url = None
        print(f"Error fetching favicon for {long_url}: {e}")

    return URL.objects.create(owner=owner, original_url=long_url, title=title, shortened_code=alias, favicon=favicon_url)    


def create_url(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))

    if request.method == "POST":
        long_url = request.POST["long-url"]
        if long_url == "" or long_url is None:
            return render(
                request,
                "url_shortener/create.html",
                {"message": "You must enter an url to shrten."}
            )
        title = request.POST["title"]
        alias = request.POST["alias"]

        new_url = create_url_obj(request.user, long_url, alias, title)

        pyperclip.copy(build_shortened_url(request, new_url))
        return HttpResponseRedirect(reverse("links"))

    return render(request, "url_shortener/create.html")


def dashboard(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))
    
    url = URL.objects.filter(owner=None).all().delete()

    return render(request, "url_shortener/dashboard.html")


def dashboard_links(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))

    if request.method == "POST":
        search_query = request.POST["search_query"]
        url_obj = URL.objects.filter(owner=request.user, title__icontains=search_query.lower())
        title = "Search results for " + f'"{search_query}"'
        message = "No results found"

    else:
        url_obj = URL.objects.filter(owner=request.user)
        title = "Links"
        message = "You haven't any links yet"

    paginator = Paginator(url_obj, 6)

    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)

    return render(
        request,
        "url_shortener/dashboard_links.html",
        {
            "page_obj": page_obj,
            "title": title,
            "empty_message": message
        },
    )


def link(request, code):
    link_obj = URL.objects.filter(shortened_code=code).all()
    
    if link_obj.count() == 0:
        return render(request, "url_shortener/not_found.html")
    
    line_chart_labels = []
    line_chart_counts = []

    count = 6
    while count >= 0:
        day = (timezone.now() - timedelta(days=count)).date()
        
        ip_records = IPRecord.objects.filter(recorded_at=day, shortened_url=link_obj.first())

        date_obj = datetime.strptime(f"{day}", "%Y-%m-%d")
        
        line_chart_labels.append(f"{date_obj.strftime("%b %d, %Y")}")
        line_chart_counts.append(ip_records.count())
        
        count -= 1

    # Count the locations
    locations = (
    IPRecord.objects
        .filter(shortened_url=link_obj.first())
        .values("location")
        .annotate(count=Count("location"))
    )

    # Count the devices
    devices = (
    IPRecord.objects
        .filter(shortened_url=link_obj.first())
        .values("device_type")
        .annotate(count=Count("device_type"))
    )

    locations_dict = {item["location"]: item["count"] for item in locations}
    devices_dict = {item["device_type"]: item["count"] for item in devices}

    return render(request, "url_shortener/link.html", {
        "link_obj": link_obj.first(),
        "line_labels": line_chart_labels,
        "line_counts": line_chart_counts,
        "location_labels": list(locations_dict.keys()),
        "location_counts": list(locations_dict.values()),
        "device_labels": list(devices_dict.keys()),
        "device_counts": list(devices_dict.values()),
        "click_count": sum(line_chart_counts), 
    })


def dashboard_analytics(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))
    
    links = URL.objects.filter(owner=request.user)
    ip_records = IPRecord.objects.filter(shortened_url__in=links)

    total_counts = ip_records.count()

    # Count locations
    location_counts = ip_records.values("location").annotate(total=Count("location"))
    locations = {location["location"]: location["total"] for location in location_counts}

    # Count devices
    device_counts = ip_records.values("device_type").annotate(total=Count("device_type"))
    devices = {device["device_type"]: device["total"] for device in device_counts}

    # Get the click counts for the past 6 days + today
    click_counts = {}
    for count in range(6, -1, -1):
        day = timezone.now() - timedelta(days=count)
        click_ip_records = ip_records.filter(recorded_at=day.date())

        date_label = day.date().strftime("%b %d, %Y")
        click_counts[date_label] = click_ip_records.count()

    return render(request, "url_shortener/dashboard_analytics.html", {
        "line_labels": list(click_counts.keys()),
        "line_counts": list(click_counts.values()),
        "location_labels": list(locations.keys()),
        "location_counts": list(locations.values()),
        "device_labels": list(devices.keys()),
        "device_counts": list(devices.values()),
        "click_count": total_counts,
    })


def dashboard_manage(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))

    return render(request, "url_shortener/dashboard_manage.html")


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def dashboard_profile(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))
    
    return render(request, "url_shortener/dashboard_profile.html", {
        "name": request.user.username
    })


def setting(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))
    
    return HttpResponseRedirect(reverse("profile"))


def index(request):
    # If the user is logged in redirect them to the dashboard
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse("dashboard"))

    if request.method == "POST":
        # Get the original url and the alias user put in
        original_url = request.POST["long-url"]
        if original_url == "" or original_url is None:
            return render(
                request,
                "url_shortener/index.html",
                {"message": "Full URL can't be empty."}
            )
        alias = request.POST["alias"]
        
        new_url = create_url_obj(None, original_url, alias, None)
        # Store the newly created url in the user's session
        request.session["anon_urls"] = request.session.get("anon_urls", []) + [
            new_url.id
        ]

        return HttpResponseRedirect(reverse("signup"))

    return render(request, "url_shortener/index.html")


def signup_view(request):
    if request.method == "POST":
        # Get the informations user filled in
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm = request.POST.get("confirm")

        # Check if the form is valid
        if (
            (username is None)
            or (email is None)
            or (password is None)
            or (confirm is None)
        ):
            return render(
                request,
                "url_shortener/register.html",
                {"message": "Please fill out all the fields."},
            )
        elif password != confirm:
            return render(
                request,
                "url_shortener/register.html",
                {"message": "Passwords doesn't match."},
            )

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
            # If the user has made an url before signing up,
            # get the url id and assign the owner of the url to the user that signed up
            anon_url_ids = request.session.pop("anon_urls", [])
            URL.objects.filter(id__in=anon_url_ids).update(owner=user)
        except IntegrityError:
            return render(
                request,
                "network/register.html",
                {
                    "message": "Username already taken.",
                },
            )

        login(request, user)
        return HttpResponseRedirect(reverse("index"))

    return render(request, "url_shortener/register.html")


def login_view(request):
    logout(request)
    if request.method == "POST":
        # Get the informations user filled in
        username = request.POST.get("login-username")
        password = request.POST.get("login-password")
        # Authenticate the user
        user = authenticate(request, username=username, password=password)
        # If a valid user
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(
                request,
                "url_shortener/login.html",
                {"message": "Invalid Email and/or Password"},
            )
    else:
        return render(request, "url_shortener/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def change_username(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            new_username = data.get("username")
            if new_username:
                user = User.objects.get(id=request.user.id)
                user.username = new_username
                user.save()

                return JsonResponse({"message": "Username updated successfully"})
            else:
                return JsonResponse({"error": "Invalid request. 'username' parameter not found in the JSON data."}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data in the request."}, status=400)
    else:
        return HttpResponseRedirect(reverse("index"))


def reset_password(request):
    if request.method == "POST":
        user = request.user

        old_password = request.POST["old_password"]
        new_password = request.POST["new_password"]
        confirm_password = request.POST["confirm_password"]

        if not check_password(old_password, user.password):
            messages.error(request, "Old password is incorrect.")
            return redirect("profile")
        
        if new_password != confirm_password:
            messages.error(request, "New password and confirm password do not match.")
            return redirect("profile")
        
        # If all checks pass change the password
        user.set_password(new_password)
        user.save()

        # Redirect them to the log in page
        logout(request)
        return HttpResponseRedirect(reverse("login"))
    else:
        return HttpResponseRedirect(reverse("login"))
    
