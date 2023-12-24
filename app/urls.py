from django.urls import path
from .views import index
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import calculate_area


urlpatterns = [
    path('', index, name='index' ),
    path('map/', views.map, name='map'),
    path('about/', views.about, name='about'),
    path('calculate/', views.calculate, name='calculate'), 
    path('calculate_area/', calculate_area, name='calculate_area')

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)