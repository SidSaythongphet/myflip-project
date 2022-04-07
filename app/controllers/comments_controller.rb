class CommentsController < ApplicationController

  def index
    render json: Comment.all, status: :ok
  end

  def create
    @comment = Comment.create!(comment_params)
    render json: @comment, status: :created
  end

  def destroy
    @comment = find_comment
    @comment.destroy
    head :no_content
  end

  private

  def find_comment
    Comment.find_by(id: params[:id])
  end

  def comment_params
    params.require(:comment).permit(:body, :user_id, :post_id)
  end

end
