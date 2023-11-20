from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("register/", views.signup_view, name="signup"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("links/", views.dashboard_links, name="links"),
    path("analytics/", views.dashboard_analytics, name="analytics"),
    path("manage/", views.dashboard_manage, name="manage"),
    path("profile/", views.dashboard_profile, name="profile"),
    path("create/", views.create_url, name="create"),
    path("links/<str:code>/", views.link, name="link"),

    # Redirect URL
    path("<str:code>", views.redirect_url, name="redirect"),

    # API Routes
    path("api/list", views.ListURLView.as_view(), name="api_list_url"),
    path("api/create", views.CreateURLView.as_view(), name="api_create_urls"),
    path("api/update/<str:shortened_code>", views.UpdateURLView.as_view(), name="api_update_url"),
    path("api/delete/<str:shortened_code>", views.DeleteURLView.as_view(), name="api_delete_url"),

    path("update/username", views.change_username, name="change_username"),
    path("update/password", views.reset_password, name="reset_password"),
]
