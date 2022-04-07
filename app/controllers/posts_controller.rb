class PostsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  skip_before_action :authorized

  def index
      if params[:user_id]
          user = User.find(params[:user_id])
          @posts = user.posts
      else
          @posts = Post.all
      end
      render json: @posts, status: :ok
  end

  def show
      @post = find_post
      render json: @post, status: :ok
  end

  def create
      @post = Post.create!(post_params)
      render json: @post, status: :created
  end

  def destroy
      @post = find_post
      @post.images.purge
      @post.destroy
      head :no_content
  end

  private

  def find_post
      Post.find_by(id: params[:id])
  end

  def post_params
      params.require(:post).permit(:user_id, :body, images: [])
  end

  def render_not_found_response
      render json: { error: "Post not found" }, status: :not_found
  end

end
