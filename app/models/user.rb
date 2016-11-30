class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :role
  has_many :sales
  before_create :set_default_role

  private
  def set_default_role
    self.role ||= Role.find_by_name('user')
  end
end
