class Api::V1::ApiController < RocketPants::Base

def self.helper(*args); end
  include Doorkeeper::Rails::Helpers
  include ActionController::Head
  include Devise::Controllers::Helpers
  include ActionController::MimeResponds
  include ActionController::StrongParameters





  private
  def current_resource_owner
    User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  end


end