# Generated by Django 3.0.3 on 2020-10-15 21:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0003_projecturlitems_content'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='projecturlitems',
            name='content',
        ),
        migrations.AddField(
            model_name='projectitems',
            name='view_count',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='projecturlitems',
            name='view_count',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
