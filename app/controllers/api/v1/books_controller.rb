class Api::V1::BooksController < Api::V1::ApiController
  before_action :doorkeeper_authorize!, except: [:index, :show]

  def create
    expose(Book.create! book_params)
  end

  def index
    expose Book.all, each_serializer: BookSerializer
  end

  def search
    expose Book.where("title like ?", "%#{params[:key]}%"), each_serializer: BookSerializer
  end

  def show
    expose book
  end

  def studied_books
    expose current_resource_owner.books, each_serializer: BookSerializer
  end

  def my_books
    expose Book.owned_by(current_resource_owner), each_serializer: BookSerializer
  end

  def rent
    book.rent_by current_resource_owner
    expose book
  end

  def return
    book.return_by current_resource_owner
    expose book
  end

  private

  def book
    @book = Book.find(params[:id] || params[:book_id])
  end


  def book_params
    b_params = params.permit :title, :author, :isbn
    b_params = b_params.merge owner_id: current_resource_owner.id
  end
end