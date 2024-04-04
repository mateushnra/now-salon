from django.db import models

STATUS_CHOICES=(
    ('1','Active'),
    ('2','Inactive'),
)

class Service(models.Model):
    name = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=200, null=False)
    status = models.CharField(max_length=8, choices=STATUS_CHOICES, default=1)
    estimatedTime = models.CharField(max_length=5, null=False)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    
    def __str__(self):
        return self.name