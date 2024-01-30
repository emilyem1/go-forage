INSERT INTO USER_ACCOUNT (FULLNAME, EMAIL, PASSWORD, PHOTO_URL)
VALUES 
  ('John Doe', 'jdoe@test.com', 'asd', 'https://avatar.iran.liara.run/public/30'),
  ('Alice Wonderland', 'awond@test.com', 'asd', 'https://avatar.iran.liara.run/public/58'),
  ('Sita Dennis', 'sitad@test.com', 'asd', 'https://avatar.iran.liara.run/public/100'),
  ('Sasha Mateo', 'matte@test.com', 'asd', 'https://avatar.iran.liara.run/public/67'),
  ('Anita Austi', 'anita@test.com', 'asd', 'https://avatar.iran.liara.run/public/98'),
  ('Lukas Souza', 'lsouza@test.com', 'asd', 'https://avatar.iran.liara.run/public/5'),
  ('Jose Alejandro', 'josea@test.com', 'asd', 'https://avatar.iran.liara.run/public/49'),
  ('Dwayne Jacob', 'jdwayne@test.com', 'asd', 'https://avatar.iran.liara.run/public/20'),
  ('Allison Saeng', 'saeng@test.com', 'asd', 'https://avatar.iran.liara.run/public/64'),
  ('Adrea Santos', 'santa@test.com', 'asd', 'https://avatar.iran.liara.run/public/86');

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
  ('Exploring Chanterelles', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2022-01-15', 50.15839605653889, -126.6635744422674, 1, 1),
  ('The Mystery of the Death Cap', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2022-02-02', 49.960909365760074, -115.8530275672674, 2, 6),
  ('Truffle Hunting Adventure', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2022-02-20', 50.99557859676613, -121.3461916297674, 3, 10),
  ('Magical Amanita Muscaria', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2022-03-10', 52.08876065107938, -126.2680666297674, 4, 8),
  ('Culinary Delight with Shiitake', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2022-03-25', 53.12944258841553, -121.3022463172674, 5, 4),
  ('Morel Mushroom Foraging', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..', '2022-04-05', 53.182145421239646, -128.02099631726742, 6, 2),
  ('A Fungus Among Us: Oyster Mushroom', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2022-04-20', 53.60144255177566, -132.15185569226742, 7, 5),
  ('Lions Mane Beauty', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2022-05-10', 57.446040559523546, -120.98632945503736, 8, 9),
  ('Porcini Adventure', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2022-05-25', 59.154442775922355, -122.26074351753736, 9, 7),
  ('Mushroom Spotting with the Truffle Hounds', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2022-06-05', 58.009172065877394, -129.995118517537386, 1, 3);

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
  (1, 1, 'Woo-hoo! Chanterelles are RULE!.'),
  (1, 5, 'The (Lorem ipsum dolor sit amet) part really makes a good point!'),
  (1, 1, 'MUSHROOMS!'),
  (2, 3, 'Thanks for the warning about the Death Cap. Stay safe!'),
  (3, 4, 'Truffle hunting sounds like an amazing adventure!'),
  (4, 5, 'The Amanita Muscaria is indeed beautiful but dangerous.'),
  (5, 6, 'Shiitake mushrooms are my favorite too!'),
  (6, 7, 'Morel mushrooms have such a unique appearance.'),
  (7, 8, 'Oyster mushrooms are so versatile in cooking.'),
  (8, 9, 'Lions Mane mushrooms are truly fascinating.'),
  (9, 10, 'Porcini risotto must have been delicious!'),
  (10, 1, 'Truffle hounds are incredible at finding treasures.');