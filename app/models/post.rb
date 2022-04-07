class Post < ApplicationRecord
  belongs_to :user
  has_many_attached :images

  def image_url
    if images.attached?
      images.all.map { |image| image.blob.url }
    end
  end
end
