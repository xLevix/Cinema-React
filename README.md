# Cinema Project made in Spring Boot and React.
The project uses a database put up on H2. Communication via JPA.
JWT tokens were used as a method of user authorization. 
Every query from the api is pre-authorized, which means you have to be logged in to see or add anything. 
Functions like Admin Panel such as adding movies or screenings have been secured and are only available to users with the moderator or admin role.

[Documentation](https://github.com/xLevix/Cinema-Spring/blob/master/Dokumentacja%20Kino%20-%20Pawel%20Pauszek.pdf)
</br>
[Frontend deployed (use of public backend endpoints)](https://kino-react.herokuapp.com/)
Please note that the frontend was made on a monitor with an aspect ratio of 32:9, which means that it may not display properly on standard monitors (despite the use of the ChakraUI library supporting scalability).
</br>
[Backend deployed only](https://kino-spring.herokuapp.com/)

