# Generated by Django 4.2.6 on 2023-11-15 08:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('url_shortener', '0017_iprecord_referrer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='iprecord',
            name='referrer',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
