class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :email, :profile_picture_url

  has_many :followers
  has_many :followees, serializer: FolloweeSerializer
end
