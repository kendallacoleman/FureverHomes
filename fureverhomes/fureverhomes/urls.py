"""
URL configuration for locallibrary project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # added for project
    path('', include('home.urls')),
    path('profiles/', include('profiles.urls')),
    path('search/', include('search_animals.urls')),
    path('animal/', include('animal_detail.urls')),
    path('about/', include('about.urls')),
]

from django.views.generic import TemplateView

urlpatterns += [
    path('', TemplateView.as_view(template_name='index.html')),
]


# Use include() to add paths from the catalog application (LAB03)
# from django.urls import include

# # Add URL maps to redirect the base URL to our application (LAB03)
# from django.views.generic import RedirectView
# urlpatterns += [
#     path('', RedirectView.as_view(url='catalog/', permanent=True)),
# ]

# Use static() to add URL mapping to serve static files during development (only) (LAB03)
from django.conf import settings
from django.conf.urls.static import static

# ----------------------------------------------------------------------
# Use static() to add URL mapping to serve static files during development ONLY
# ----------------------------------------------------------------------
if settings.DEBUG:
    # Use STATICFILES_DIRS[0] to point to your project's 'static' folder
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
    
    # NOTE: The line below is more general, but the line above is best for your setup.
    # urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) 
    # If STATIC_ROOT is also defined, you may not need the DIRS version, 
    # but using DIRS is explicit for project-level static files in development.