# Generated by Django 4.2.6 on 2023-11-11 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('url_shortener', '0011_remove_url_expired_date'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='url',
            unique_together=set(),
        ),
        migrations.AlterField(
            model_name='url',
            name='shortened_code',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]