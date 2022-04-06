class AuthenticateController < ApplicationController
  wrap_parameters format: [:json]
  skip_before_action :authorized

  # retrieve token and decode to get current user
  def profile
      render json: current_user, serializer: UserSerializer
  end

  # log in route
  def create
      @user = User.find_by(username: user_login_params[:username])
      if @user && @user.authenticate(user_login_params[:password])
          @token = encode_token({ user_id: @user.id })
          render json: { user: UserSerializer.new(@user), token: @token }, status: :accepted
      else
          render json: { errors: ['Invalid username or password'] }, status: :unauthorized
      end
  end

  private

  def user_login_params
      params.require(:user).permit(:username, :password)
  end

end
