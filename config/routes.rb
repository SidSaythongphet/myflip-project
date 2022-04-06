Rails.application.routes.draw do

  scope :api do
    get '/', to: 'application#server'
  end

end
