[dbdiagram.io](https://dbdiagram.io/)

[dbdiagram v1](https://dbdiagram.io/d/65e480d3cd45b569fb64fd4d)

```

Table courses {
  id integer [primary key]
  instructor_id integer
  title varchar
  slug varchar [unique]
  thumbnail varchar
  description text
  position int [unique]
  created_at timestamp
  updated_at timestamp
}

Table sections {
  id integer [primary key]
  course_id integer
  title varchar
  slug varchar [unique]
  position int [unique]
  created_at timestamp
  updated_at timestamp
}

Table lessons {
  id integer [primary key]
  section_id integer
  title varchar
  slug varchar [unique]
  video_url varchar
  video_length int
  description text
  position int [unique]
  created_at timestamp
  updated_at timestamp
}

Enum user_role {
  admin
  instructor
  user
}

Table users {
  id integer [primary key]
  nick varchar [unique]
  email varchar  [unique]
  password varchar
  role user_role
  created_at timestamp
  updated_at timestamp
}

Table user_courses {
  id integer [primary key]
  user_id integer
  course_id integer
  assign_to date
  created_at timestamp
  updated_at timestamp
}

Ref: users.id < courses.instructor_id
Ref: courses.id < sections.course_id
Ref: sections.id < lessons.section_id
Ref: courses.id < user_courses.course_id
Ref: users.id < user_courses.user_id

```
