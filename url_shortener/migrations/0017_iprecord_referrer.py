# Generated by Django 4.2.6 on 2023-11-15 07:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('url_shortener', '0016_iprecord_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='iprecord',
            name='referrer',
            field=models.URLField(blank=True, null=True),
        ),
    ]
