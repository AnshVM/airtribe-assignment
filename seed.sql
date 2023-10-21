CREATE TABLE IF NOT EXISTS Instructors(
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Courses(
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    instructor_id   INT REFERENCES Instructors(id),
    max_seats       INT,
    start_date      DATE
);

CREATE TABLE IF NOT EXISTS Leads(
    id              SERIAL PRIMARY KEY,
    course_id       INT REFERENCES Courses(id),
    status          VARCHAR(20),
    name            VARCHAR(255),
    email           VARCHAR(255) UNIQUE NOT NULL,
    phone           VARCHAR(255) UNIQUE NOT NULL,
    linkedin        VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Comments(
    lead_id         INT REFERENCES Leads(id),
    instructor_id   INT REFERENCES Instructors(id)
);