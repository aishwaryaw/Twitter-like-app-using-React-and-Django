from django.shortcuts import render , redirect
from django.contrib.auth import get_user_model , login , logout , authenticate
from django.contrib.auth.forms import AuthenticationForm , UserCreationForm
# Create your views here.

User = get_user_model()

def login_view(request, *args, **kwargs):

    if request.user.is_authenticated:
        return redirect("/")

    form = AuthenticationForm(request , data =request.POST or None)
    if form.is_valid():
        user = form.get_user()
        login(request , user)
        return redirect(to="/")

    context = {
        "form" : form,
        "btn_label" : 'Login',
        "title" : 'Login'
    }
    return render(request, "accounts/auth.html", context)


def logout_view(request, *args , **kwargs):
    
    if not request.user.is_authenticated:
        return redirect("/")

   
    if request.method == "POST":
        logout(request)
        return redirect("/login")
        
    context = {
        "form" : None,
        "description": "Are you sure you want to logout?",
        "btn_label": "Click to Confirm",
        "title": "Logout"
        }
    return render(request, "accounts/auth.html", context)
    


def register_view(request , *args , **kwargs):

    if request.user.is_authenticated:
        return redirect("/")

    form = UserCreationForm(data=request.POST or None)
    if form.is_valid():
        user = form.save(commit=True)
        user.set_password(form.cleaned_data.get("password1"))
        user = authenticate(username=form.cleaned_data['username'],password=form.cleaned_data['password1'] )
        login(request, user)
        # print(user)
        # print(request.user.is_authenticated)
        return redirect("/")
    
    context = {
        "form" : form,
        'btn_label' : 'Register',
        'title' : 'Register'
    }

    
    return render(request , "accounts/auth.html" , context)


