# Generated by Django 4.2.6 on 2023-11-15 09:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('url_shortener', '0018_alter_iprecord_referrer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='iprecord',
            name='referrer',
        ),
    ]
