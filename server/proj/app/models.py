"""This module defines the structure of DB.
"""
from django.db import models

class Event(models.Model):
    """This class defines the structure of event table.
    """

    name = models.CharField('Event Name', max_length=200, help_text="イベント名を入力してください。")
    date = models.DateTimeField('Event Date', help_text="イベントの日時を入力してください。")
    location = models.CharField('Event Location', max_length=200, null=True, help_text="イベントの場所を入力してください。")
    description = models.TextField('Event Description', null=True, help_text="イベントの説明を入力してください。")
    public = models.IntegerField('Public Setting', default=0, help_text="公開設定を入力してください。0:非公開, 1:公開。")
    owner = models.ForeignKey('auth.User', related_name='owner_events', on_delete=models.CASCADE)
    artist = models.ForeignKey('Artist', related_name='artist_events', on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ['date']

class Artist(models.Model):
    """This class defines the structure of artist table.
    """

    name = models.CharField('Artist Name', max_length=200, help_text="アーティスト名を入力してください。")
    description = models.TextField('Artist Description', null=True, help_text="アーティストの説明を入力してください。")

    class Meta:
        ordering = ['name']
