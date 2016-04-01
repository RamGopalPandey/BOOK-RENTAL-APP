class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :image

  def image
    object.image.url(:large)
  end
end