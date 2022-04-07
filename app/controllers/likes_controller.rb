class LikesController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def create
    @like = Like.create!(like_params)
    if @like.save
      render json: @like, status: :created
    end
  end

  def destroy
    @like = Like.find_by(user_id: params[:id])
    @like.destroy
    head :no_content
  end

  private

  def like_params
    params.require(:like).permit(:user_id, :post_id)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
