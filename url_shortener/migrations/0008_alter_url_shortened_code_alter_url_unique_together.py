# Generated by Django 4.2.6 on 2023-11-07 09:02

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('url_shortener', '0007_alter_url_expired_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='url',
            name='shortened_code',
            field=models.CharField(max_length=10),
        ),
        migrations.AlterUniqueTogether(
            name='url',
            unique_together={('owner', 'shortened_code')},
        ),
    ]
