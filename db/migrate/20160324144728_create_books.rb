class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|

      t.string :title
      t.string :author
      t.string :isbn
      t.belongs_to :owner
      t.belongs_to :rented_by

      t.timestamps null: false
    end
  end
end
