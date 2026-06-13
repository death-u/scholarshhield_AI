from django.urls import path
from . import views
urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login_view, name='login'),
    path('dashboard/', views.Dash_board, name='dash'),
    path('chat/', views.chat_view, name='chat'),
    path('upload_text/', views.uploads_text, name='uploads_text'),
    path('upload_file/', views.uploads_file, name='uploads_file'),
    path('task_planner/', views.task_planner, name='task_planner'),
    path('resolve_task_endpoint/<int:task_id>/', views.resolve_task_endpoint, name='resolve_task_endpoint'),
    path('notes/upload-file/', views.upload_note_file_view, name='upload_note_file'),
    path('notes/upload-text/', views.upload_note_text_view, name='upload_note_text'),
    path('notes/delete/<int:note_id>/', views.delete_note_view, name='delete_note'),
]
