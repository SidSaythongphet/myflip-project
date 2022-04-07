class FollowshipsController < ApplicationController
  def create
    @followship = Followship.create!(follow_params)
    render json: @followship, status: :created
  rescue ActiveRecord::RecordNotUnique => e    
    render json: { e: "Already following" }, status: :unprocessable_entity
  end

  def destroy
      current_user.active_followships.find_by(followee_id: params[:id]).destroy
      head :no_content
  end 

  private

  def follow_params
      params.require(:followship).permit(:follower_id, :followee_id)
  end

end
