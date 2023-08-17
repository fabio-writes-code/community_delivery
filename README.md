# Description

This repo contains delivy, a community driven delivery platform where users can submit and fulfilled delivery requests from and to other users.
<br> <br>

![](delivy.gif)

# Project Structure

The project is composed of two apps, `api` and `restaurant`. The API retrieves requests, and updates nearby stores in the interactive map. The front-end allows users to create and fulfill requests.
<br> <br>

# Installation

1. Install PostgreSQL and PostGIS

2. install the dependencies

```jsx
pipenv install
```

3. Install GDAL (for Django to interface with PostGIS)

   - https://gdal.org/

4. Create and Activate the virtual environment

```jsx
pipenv shell
```

<br>

# Setup

Configure your database access

```jsx
DATABASES = {
  default: {
    ENGINE: 'django.contrib.gis.db.backends.postgis',
    NAME: 'database_name',
    HOST: 'dastabase_host',
    PORT: 'database_port',
    USER: 'database_user',
    PASSWORD: 'database_password',
  },
};
```

💡 Change those settings according to your local setup.
<br>
<br>

Apply the migrations

```jsx
python manage.py migrate
```

<br>

### Endpoints for `api` app

```jsx
stores/{?lat=""&lng=""}
home/{?username=""}
wishlist/
```

<br>

stores/?lat=""&lng=""
| Method | Action | TOKEN AUTH | STATUS CODE |
| --- | --- | --- | --- |
| GET | Retrieves all stores in a 10km radius | No | 200 |
<br>

home?username="username"
| Method | Action | TOKEN AUTH | STATUS CODE |
| --- | --- | --- | --- |
| GET | Retrieves mapbox front-end app | No | 200 |
<br>

/wishlist
| Method | Action | TOKEN AUTH | STATUS CODE |
| --- | --- | --- | --- |
| GET | Retrieves nearby wishlists| Yes | 200 |
| PUT | Creates a new wishlist | Yes | 200 |
| PATCH | Updates wishlist status | Yes | 200 |
<br>
