class ApplicationController < ActionController::API

  def server
    render json: { server: 'myFlip' }
  end

end
