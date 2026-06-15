import os
from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# ==========================================
# EXISTING MODELS
# ==========================================

class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )
    department = models.CharField(max_length=150)
    level = models.IntegerField()

    def __str__(self):
        return (f"ID: {self.id}, user: {self.user}, department: {self.department}, level: {self.level}.")
    

class AcademicTask(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    excerpt = models.TextField()
    tag = models.CharField(max_length=50)
    ai_score = models.FloatField(default=0.0)
    deadline = models.DateField()
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-ai_score', 'deadline']

    def __str__(self):
        return f"Task: {self.title} | Rating: {self.ai_score} | Done: {self.is_completed}"


# ==========================================
# NEW SCHOLARSHIELD NOTES SYSTEM
# ==========================================

# Security Gatekeeper: Server-Side Extension Validation
def validate_note_file_extension(value):
    ext = os.path.splitext(value.name)[1].lower()
    valid_extensions = ['.pdf', '.docx', '.txt']
    if not ext in valid_extensions:
        raise ValidationError("Security Alert: Unsupported file extension. Only PDF, DOCX, and TXT are permitted.")

# Dynamic upload path: organizes files cleanly by user ID in storage
def user_notes_directory_path(instance, filename):
    return f'user_{instance.user.id}/academic_notes/{filename}'


class AcademicNote(models.Model):
    # 1. User ownership (Data Segregation matching your existing models)
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="academic_notes"
    )
    
    # 2. UI Card Content Fields
    topic = models.CharField(
        max_length=255, 
        default="Untitled Analysis",
        help_text="The AI-generated main topic heading for the card UI."
    )
    
    ai_summary = models.TextField(
        blank=True, 
        null=True,
        help_text="The core Markdown/Text summary rendered inside the .note_main container."
    )
    
    # 3. Input References (Handles both Files and Pasted Text)
    file_name = models.CharField(
        max_length=255, 
        help_text="The original name displayed in the card footer (e.g., 'cryptography_notes.pdf' or 'Raw Text Analysis')."
    )
    
    uploaded_file = models.FileField(
        upload_to=user_notes_directory_path,
        validators=[validate_note_file_extension],
        blank=True,
        null=True,
        help_text="Stores the physical file if uploaded. Blank if text was pasted."
    )
    
    raw_extracted_text = models.TextField(
        blank=True, 
        null=True,
        help_text="Stores the plain text extracted from files or pasted directly. Used as the context source for LLM operations."
    )
    tags = models.JSONField(default=list, help_text="List of AI-generated tags for the UI.")

    # 4. Timestamps & Analytics
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at'] 
        verbose_name = "Academic Note"
        verbose_name_plural = "Academic Notes"

    def __str__(self):
        return f"{self.user.username} - {self.topic[:30]} ({self.file_name})"