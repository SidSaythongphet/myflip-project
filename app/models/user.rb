class User < ApplicationRecord
  include ActiveModel::SecurePassword
  has_secure_password
  has_one_attached :profile_picture
end
