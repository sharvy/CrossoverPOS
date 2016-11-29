user_role   = Role.find_or_create_by(name: 'user')
admin_role  = Role.find_or_create_by(name: 'admin')

User.find_or_create_by(email: 'user@crossover.com' ) do |u|
  u.password  = 'user_password'
  u.role      = user_role
end

User.find_or_create_by(email: 'admin@crossover.com') do |u|
  u.password  = 'admin_password'
  u.role      = admin_role
end