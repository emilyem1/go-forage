INSERT INTO USER_ACCOUNT (ID, FULLNAME, USERNAME)
VALUES 
  (1, 'John Doe', 'jdoe'),
  (2, 'Alice Wonderland', 'awond'),
  (3, 'Sita Dennis', 'sitad'),
  (4, 'Sasha Mateo', 'matte'),
  (5, 'Anita Austi', 'anita'),
  (6, 'Lukas Souza', 'lsouza'),
  (7, 'Jose Alejandro', 'josea'),
  (8, 'Dwayne Jacob', 'jdwayne'),
  (9, 'Allison Saeng', 'saeng'),
  (10, 'Adrea Santos', 'santa');

  -- 10 Inserts for MUSHROOM table
INSERT INTO MUSHROOM (TITLE,IMAGE_URL, INFO, EDIBLE) VALUES
  ('Chanterelle', 'mushrooms/Chanterelle.jpg', 'Golden and delicious', true),
  ('Morel', 'mushrooms/Morel.jpg', 'Distinct honeycomb appearance', true),
  ('Fly Agaric', 'mushrooms/Fly_Agaric.jpg', 'Red with white spots', false),
  ('Shiitake', 'mushrooms/Shiitake.jpg', 'Popular in Asian cuisine', true),
  ('Oyster Mushroom', 'mushrooms/Oyster.jpg', 'Oyster-shaped cap', true),
  ('Death Cap', 'mushrooms/Death_Cap.jpg', 'Extremely poisonous', false),
  ('Porcini', 'mushrooms/Porcini.jpg', 'Robust and nutty flavor', true),
  ('Amanita Muscaria', 'mushrooms/Amanita_Muscaria.jpg', 'Bright red with white warts', false),
  ('Lions Mane', 'mushrooms/Lions_Mane.jpg', 'Looks like a white waterfall', true),
  ('Truffle', 'mushrooms/Truffle.jpg', 'Highly prized in gourmet cuisine', true);

-- 10 Inserts for BLOG table
INSERT INTO BLOG (TITLE, content, publication_date, latitude, longitude, USER_ID, MUSHROOM_ID) VALUES
  ('Exploring Chanterelles', 'Today, I went on a hike and found some delicious Chanterelles.', '2022-01-15', 37.7749, -122.4194, 1, 1),
  ('The Mystery of the Death Cap', 'Beware of the Death Cap mushroom; it can be lethal if consumed.', '2022-02-02', 40.7128, -74.0060, 2, 6),
  ('Truffle Hunting Adventure', 'Embarked on a truffle hunting adventure and discovered the magic of these rare fungi.', '2022-02-20', 51.5074, -0.1278, 3, 10),
  ('Magical Amanita Muscaria', 'The Amanita Muscaria is beautiful but toxic. Learn about its fascinating history.', '2022-03-10', 48.8566, 2.3522, 4, 8),
  ('Culinary Delight with Shiitake', 'Experimented with Shiitake mushrooms in the kitchen and created a delicious dish.', '2022-03-25', 34.0522, -118.2437, 5, 4),
  ('Morel Mushroom Foraging', 'Ventured into the woods and discovered the unique honeycomb pattern of Morel mushrooms.', '2022-04-05', 45.4215, -75.6993, 6, 2),
  ('A Fungus Among Us: Oyster Mushroom', 'Explored the versatility of Oyster mushrooms in various culinary delights.', '2022-04-20', 55.7558, 37.6176, 7, 5),
  ('Lions Mane Beauty', 'Encountered the fascinating Lions Mane mushroom and marveled at its unusual appearance.', '2022-05-10', -33.8688, 151.2093, 8, 9),
  ('Porcini Adventure', 'Went on a Porcini foraging expedition and relished the robust and nutty flavor in a risotto.', '2022-05-25', 40.4168, -3.7038, 9, 7),
  ('Mushroom Spotting with the Truffle Hounds', 'Joined a truffle hunting party and witnessed the skilled truffle hounds at work.', '2022-06-05', 52.5200, 13.4050, 1, 3);

-- 10 Inserts for FRIENDS table
INSERT INTO FRIENDS (USER_ID, FRIEND_USER_ID, FRIENDSHIP_STATUS) VALUES
  (1, 2, true),
  (1, 3, true),
  (2, 4, true),
  (3, 5, false),
  (4, 6, true),
  (5, 7, false),
  (6, 8, true),
  (7, 9, true),
  (8, 10, false),
  (9, 1, true);

-- 10 Inserts for FAVOURITES table
INSERT INTO FAVOURITES (USER_ID, BLOG_ID) VALUES
  (1, 1),
  (2, 3),
  (3, 5),
  (4, 7),
  (5, 9),
  (6, 2),
  (7, 4),
  (8, 6),
  (9, 8),
  (10, 9);

-- 10 Inserts for MUSHROOM_POST table
INSERT INTO MUSHROOM_POST (BLOG_ID, MUSHROOM_ID) VALUES
  (1, 1),
  (2, 6),
  (3, 10),
  (4, 8),
  (5, 4),
  (6, 2),
  (7, 5),
  (8, 9),
  (9, 7),
  (10, 3);

-- 10 Inserts for COMMENTS table
INSERT INTO COMMENTS (BLOG_ID, COMMENTER_ID, MESSAGE) VALUES
  (1, 2, 'Great find! Chanterelles are delicious.'),
  (2, 3, 'Thanks for the warning about the Death Cap. Stay safe!'),
  (3, 4, 'Truffle hunting sounds like an amazing adventure!'),
  (4, 5, 'The Amanita Muscaria is indeed beautiful but dangerous.'),
  (5, 6, 'Shiitake mushrooms are my favorite too!'),
  (6, 7, 'Morel mushrooms have such a unique appearance.'),
  (7, 8, 'Oyster mushrooms are so versatile in cooking.'),
  (8, 9, 'Lions Mane mushrooms are truly fascinating.'),
  (9, 10, 'Porcini risotto must have been delicious!'),
  (10, 1, 'Truffle hounds are incredible at finding treasures.');