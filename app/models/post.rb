class Post < ApplicationRecord
  belongs_to :user
  has_many_attached :images
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy

  def image_url
    if images.attached?
      images.all.map { |image| image.blob.url }
    end
  end
end
