from django.db import models

STATUS_CHOICES=(
    ('1','Active'),
    ('2','Inactive'),
)

class Salon(models.Model):
    name = models.CharField(max_length=50, null=False)
    phone = models.CharField(max_length=13, null=False)
    daysWeekOpen = models.CharField(max_length=150, null=False)
    openHour = models.CharField(max_length=13, null=False)
    closeHour = models.CharField(max_length=13, null=False)
    email = models.EmailField(max_length=100, null=False, unique=True)
    status = models.CharField(max_length=8, choices=STATUS_CHOICES, default=1)
    address = models.CharField(max_length=100, null=False)
    neighborhood = models.CharField(max_length=100, null=False)
    cityState = models.CharField(max_length=50, null=False)
    
    def __str__(self):
        return self.name