class JoinTableBooksUsers < ActiveRecord::Migration
  def change
    create_table :books_users do |t|

      t.belongs_to :book
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
