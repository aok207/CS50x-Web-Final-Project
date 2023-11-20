from rest_framework import serializers
from .models import *


class URLSerializers(serializers.ModelSerializer):
    class Meta:
        model = URL
        fields = ["id", "original_url", "shortened_code", "created_at", "title"]
        extra_kwargs = {
            "owner": {"required": False, "allow_null": True},
            "shortened_code": {"required": False},
            "title": {"required": False}
        }
