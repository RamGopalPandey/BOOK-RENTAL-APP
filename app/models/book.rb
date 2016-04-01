class Book < ActiveRecord::Base
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  belongs_to :rented_by, class_name: 'User', foreign_key: 'rented_by_id'
  has_and_belongs_to_many :users

  scope :owned_by, -> (user) {
    where owner: user
  }


  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  def rent_by user
    if rented_by.nil?
      self.rented_by = user
      self.users << user unless user.books.pluck(:id).include? self.id
      self.save!
    end
  end

  def return_by user
    update_attributes rented_by_id: nil if self.rented_by == user
  end

end