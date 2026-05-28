INSERT INTO user_roles (user_id, role) 
VALUES ('59e449a3-240d-477d-aa08-e2ac4cdaae53', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;