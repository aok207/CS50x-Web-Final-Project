# Generated by Django 4.2.6 on 2023-11-15 10:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('url_shortener', '0019_remove_iprecord_referrer'),
    ]

    operations = [
        migrations.RenameField(
            model_name='iprecord',
            old_name='user_agent',
            new_name='device_type',
        ),
    ]