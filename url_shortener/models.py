from django.db import models
from django.contrib.auth.models import User

import random
import string


def generate_unique_code():
    length = 8
    characters = string.ascii_letters + string.digits
    while True:
        code = "".join(random.choices(characters, k=length))
        if URL.objects.filter(shortened_code=code).count() == 0:
            break
    return code


class URL(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="urls", null=True, blank=True
    )
    original_url = models.URLField()
    shortened_code = models.CharField(
        max_length=10,
        unique=True,
    )
    favicon = models.CharField(max_length=100000000000000, blank=True, null=True)
    title = models.CharField(max_length=100000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.id}-{self.owner.username} created at {self.created_at}"


class IPRecord(models.Model):
    shortened_url = models.ForeignKey(URL, on_delete=models.CASCADE)
    ip_address = models.GenericIPAddressField()
    location = models.CharField(max_length=100)
    recorded_at = models.DateField(auto_now_add=True)
    device_type = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.shortened_url.owner}-IP Record - {self.ip_address} for {self.shortened_url.shortened_code} at {self.recorded_at}"
