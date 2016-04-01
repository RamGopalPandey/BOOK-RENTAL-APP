class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :isbn, :image, :owner_id, :rented_by_id

  #has_one :owner, serializer: UserSerializer

  def image
    object.image.url(:large)
  end
end