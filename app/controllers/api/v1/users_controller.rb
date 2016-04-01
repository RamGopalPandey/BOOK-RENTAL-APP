class Api::V1::UsersController < Api::V1::ApiController
  before_action :doorkeeper_authorize!, except: :create
  #skip_before_filter :verify_authenticity_token, :only => :create

  def create
    expose(User.create! user_params)
  end

  def me
    expose current_resource_owner   
  end




  def user_params
    params.permit :email, :password, :password_confirmation
  end
end
