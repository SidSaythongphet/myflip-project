class UsersController < ApplicationController
  wrap_parameters format: [:json]
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  skip_before_action :authorized, only: [:create]

  def index
    @users = User.all
    render json: @users, status: :ok
  end

  def show 
    @user = find_user
    render json: @user, status: :ok
  end

  def create
    params = user_params.except(:profile_picture)
    @user = User.create!(user_params)
    if @user.valid?
      @token = encode_token({ user_id: @user.id })
      render json: { user: UserSerializer.new(@user), token: @token }, status: :created
    end
  end

  def update
    new_profile_picture = params[:profile_picture]
    @user = find_user
    if new_profile_picture.present?
      @user.profile_picture.purge
      @user.profile_picture.attach(new_profile_picture)
    end
    if @user.update!(user_params)
      render json: @user, status: :accepted
    end
  end
     
  private

  def find_user
    User.find_by(id: params[:id])
  end

  def user_params
    params.permit(:first_name, :last_name, :username, :email, :password, :password_confirmation, :profile_picture)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
