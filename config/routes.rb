Rails.application.routes.draw do
  resources :users

  scope :api do
    get '/', to: 'application#server'
  end

end
