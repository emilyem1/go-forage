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
  ('Exploring Chanterelles', 'Today, I went on a hike and found some delicious Chanterelles.', '2022-01-15', 50.15839605653889, -126.6635744422674, 1, 1),
  ('The Mystery of the Death Cap', 'Beware of the Death Cap mushroom; it can be lethal if consumed.', '2022-02-02', 49.960909365760074, -115.8530275672674, 2, 6),
  ('Truffle Hunting Adventure', 'Embarked on a truffle hunting adventure and discovered the magic of these rare fungi.', '2022-02-20', 50.99557859676613, -121.3461916297674, 3, 10),
  ('Magical Amanita Muscaria', 'The Amanita Muscaria is beautiful but toxic. Learn about its fascinating history.', '2022-03-10', 52.08876065107938, -126.2680666297674, 4, 8),
  ('Culinary Delight with Shiitake', 'Experimented with Shiitake mushrooms in the kitchen and created a delicious dish.', '2022-03-25', 53.12944258841553, -121.3022463172674, 5, 4),
  ('Morel Mushroom Foraging', 'Ventured into the woods and discovered the unique honeycomb pattern of Morel mushrooms.', '2022-04-05', 53.182145421239646, -128.02099631726742, 6, 2),
  ('A Fungus Among Us: Oyster Mushroom', 'Explored the versatility of Oyster mushrooms in various culinary delights.', '2022-04-20', 53.60144255177566, -132.15185569226742, 7, 5),
  ('Lions Mane Beauty', 'Encountered the fascinating Lions Mane mushroom and marveled at its unusual appearance.', '2022-05-10', 57.446040559523546, -120.98632945503736, 8, 9),
  ('Porcini Adventure', 'Went on a Porcini foraging expedition and relished the robust and nutty flavor in a risotto.', '2022-05-25', 59.154442775922355, -122.26074351753736, 9, 7),
  ('Mushroom Spotting with the Truffle Hounds', 'Joined a truffle hunting party and witnessed the skilled truffle hounds at work.', '2022-06-05', 58.009172065877394, -129.995118517537386, 1, 3);

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