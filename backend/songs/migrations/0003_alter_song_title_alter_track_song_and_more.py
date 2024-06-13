# Generated by Django 4.2.13 on 2024-06-13 01:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0002_alter_track_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='title',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='track',
            name='song',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tracks', to='songs.song'),
        ),
        migrations.AddConstraint(
            model_name='song',
            constraint=models.UniqueConstraint(fields=('user', 'title'), name='unique_song_for_user'),
        ),
    ]
