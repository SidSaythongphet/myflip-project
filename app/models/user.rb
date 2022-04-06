class User < ApplicationRecord
  has_one_attached :profile_picture
  has_secure_password
end
