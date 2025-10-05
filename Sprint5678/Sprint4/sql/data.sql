USE service_app;

INSERT INTO categories (name) VALUES ('Plumbing'), ('Gardening'), ('Electrician');

INSERT INTO users (first_name,last_name,email,password,role) VALUES
('Tobias','Client','tobias@example.com','password123','client'),
('Juan','Plomero','juan@example.com','password123','worker'),
('Maria','Jardinera','maria@example.com','password123','worker');

INSERT INTO services (name,description,price,worker_id,category_id) VALUES
('Fix leaking pipe','Repair kitchen pipe leaks',5000,2,1),
('Lawn mowing','Mow and trim the lawn',2000,3,2);

INSERT INTO ratings (service_id,client_id,score,comment) VALUES
(1,1,5,'Great service!'),
(2,1,4,'Good job, fast and friendly.');

INSERT INTO bookings (service_id,client_id,booking_date,status) VALUES
(1,1,'2025-10-06 10:00:00','confirmed'),
(2,1,'2025-10-07 09:00:00','pending');
