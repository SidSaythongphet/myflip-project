class User < ApplicationRecord
  include ActiveModel::SecurePassword
  has_secure_password
  has_one_attached :profile_picture
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy

  has_many :followships, dependent: :destroy

  has_many :passive_followships, foreign_key: :followee_id, class_name: 'Followship', dependent: :destroy
  has_many :followers, through: :passive_followships

  has_many :active_followships, foreign_key: :follower_id, class_name: 'Followship', dependent: :destroy
  has_many :followees, through: :active_followships

  validates_presence_of :first_name, :last_name, :username, :email 
  validates_uniqueness_of :username, :email, case_sensitive: false
  validates :first_name, format: { with: /\A[a-zA-Z]+\z/,
      message: "only allows letters" }
  validates :last_name, format: { with: /\A[a-zA-Z]+\z/,
      message: "only allows letters" }


  def profile_picture_url
    if profile_picture.attached?
      profile_picture.blob.url
    end
  end
  
end
