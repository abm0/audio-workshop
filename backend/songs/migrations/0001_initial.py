# Generated by Django 4.2.13 on 2024-06-11 19:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=50, unique=True)),
                ('tempo', models.IntegerField(null=True)),
                ('key', models.CharField(max_length=10, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'songs',
            },
        ),
        migrations.CreateModel(
            name='Track',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('extension', models.CharField(max_length=10)),
                ('type', models.CharField(max_length=10)),
                ('file', models.FileField(upload_to='uploads/')),
                ('song', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='song', to='songs.song')),
            ],
            options={
                'db_table': 'tracks',
            },
        ),
    ]
